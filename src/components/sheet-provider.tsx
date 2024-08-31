"use client";
import { useMountedState } from "react-use";
import NewProductSheet from "./new-product-sheet";
import EditProductSheet from./ products / new - product - sheetroduct - sheet;
";

export default function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewProductSheet />
      <EditProductSheet />
    </>
  );
}
