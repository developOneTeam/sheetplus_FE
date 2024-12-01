import ContentsTable from "@/app/components/ContentsTable";

export default async function Page({ params } : { params: { contest : string } }) {

    let schedule = null;

    const fetchData = await fetch(`${process.env.API_ENDPOINT}/public/${params.contest}/schedule`, {
        method: "get",
        headers: {
            "Content-Type" : "application/json",
        }
    });

    if (fetchData.ok) {
        schedule = await fetchData.json();
    }

    return (
        <>
        
        {schedule && schedule.data.length > 0 ? 
            <ContentsTable type="schedule" data={schedule.data} />
        :""}
        </>
    )
};
