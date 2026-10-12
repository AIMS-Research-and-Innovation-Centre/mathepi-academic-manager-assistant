/*
 * Pi on-device understanding.
 *
 * Runs a small sentence-embedding model (all-MiniLM-L6-v2: a 23 MB quantised
 * model plus a ~6 MB WebAssembly runtime)
 * inside a Web Worker so the page never freezes. The model is downloaded once
 * and then served from the browser cache, so it also works offline. Nothing
 * the user types leaves the device: the model only turns text into vectors
 * that pi-engine.js compares with the programme knowledge.
 */
import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0/dist/transformers.min.js";

const MODEL = "Xenova/all-MiniLM-L6-v2";

env.allowLocalModels = false;
env.useBrowserCache = true;

let extractor = null;
let loading = null;

function load() {
  if (extractor) return Promise.resolve(extractor);
  if (loading) return loading;
  const files = new Map();
  loading = pipeline("feature-extraction", MODEL, {
    device: "wasm",
    dtype: "q8",
    progress_callback: (event) => {
      if (event.status !== "progress" || !event.file) return;
      files.set(event.file, { loaded: event.loaded || 0, total: event.total || 0 });
      let loaded = 0;
      let total = 0;
      for (const file of files.values()) {
        loaded += file.loaded;
        total += file.total;
      }
      self.postMessage({ type: "progress", loaded, total });
    },
  })
    .then((pipe) => {
      extractor = pipe;
      self.postMessage({ type: "ready" });
      return pipe;
    })
    .catch((error) => {
      loading = null;
      self.postMessage({ type: "error", message: error && error.message ? error.message : String(error) });
      throw error;
    });
  return loading;
}

self.onmessage = async (event) => {
  const message = event.data || {};
  if (message.type === "load") {
    load().catch(() => {});
    return;
  }
  if (message.type === "embed") {
    try {
      const pipe = await load();
      const vectors = [];
      // Small batches keep memory flat on low-end phones.
      for (let i = 0; i < message.texts.length; i += 16) {
        const batch = message.texts.slice(i, i + 16);
        const output = await pipe(batch, { pooling: "mean", normalize: true });
        const [rows, width] = output.dims;
        for (let row = 0; row < rows; row += 1) vectors.push(Array.from(output.data.slice(row * width, (row + 1) * width)));
      }
      self.postMessage({ type: "embedded", id: message.id, vectors });
    } catch (error) {
      self.postMessage({ type: "embedded", id: message.id, error: error && error.message ? error.message : String(error) });
    }
  }
};
