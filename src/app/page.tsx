import CategoriesPanel from "@/components/categories-panel";
import ProductList from "@/components/product-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <CategoriesPanel />
      <ProductList />
    </>
  );
}
