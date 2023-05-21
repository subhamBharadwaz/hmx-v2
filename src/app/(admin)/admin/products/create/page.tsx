import ProductForm from "@/components/admin/products/product-form";

export default function CreateProductPage(){
    return (
        <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-foreground">Add New Product</h3>
            <ProductForm/>
        </div>
    )
}