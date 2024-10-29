import AdminEvents from "@/app/components/Admin/AdminEvents";

export default async function Page({ params } : { params: { contest : string } }) {
    let data = null;
    
    const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/${params.contest}/schedule`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (dataReq.ok) {
        data = await dataReq.json();
    }
    
    return (
        <AdminEvents data={data?.data} />
    )
    
}