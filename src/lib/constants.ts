import uFuzzy from "@leeoniya/ufuzzy";

export const ITEMS_PER_PAGE = 20;

// See https://github.com/leeoniya/uFuzzy#options
export const uf = new uFuzzy({
  intraMode: 0,
  intraIns: 1,
  interIns: Infinity,
  intraChars: "[a-z\\d]",
  interChars: ".",
  interLft: 0,
  interRgt: 0,
  intraSub: 1,
  intraTrn: 1,
  intraDel: 1,
});
