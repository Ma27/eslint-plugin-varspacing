with import <nixpkgs> {}; let
  nodeEnv = import ./nix { };
in if stdenv.lib.inNixShell then nodeEnv.shell else {
  inherit (nodeEnv) tarball package;
}
