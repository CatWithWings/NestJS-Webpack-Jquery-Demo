export function GlobalMiddleware(res, req, next) {
  console.log("I'm a global middleware...");
  next();
}
