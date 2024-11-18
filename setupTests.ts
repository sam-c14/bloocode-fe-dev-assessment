import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}
