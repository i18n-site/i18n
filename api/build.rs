fn main() {
  if let Err(err) = bincode_typescript::from_file("./src/lib.rs", "./api.ts", false) {
    eprintln!("{}", err);
  }
}
