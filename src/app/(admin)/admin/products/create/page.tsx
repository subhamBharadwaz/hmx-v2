import ProductForm from "@/components/admin/products/create/product-form";
import { getCurrentUser } from "@/lib/session";

export default async function CreateProductPage(){
    const user = await getCurrentUser()
    return (
        <div className="space-y-10">
            <h3 className="text-2xl font-semibold text-foreground">Add New Product</h3>
            <ProductForm accessToken={user?.accessToken} />
        </div>
    )
}