"use client";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import dynamic from "next/dynamic";
const PieChart = dynamic(() => import("@toast-ui/react-chart").then((lib) => lib.PieChart), { ssr: false });

export default function AdminDashboard() {
    return (
        <>
        <p>차트</p>
        <PieChart data = {{
            categories: ['스탬프 이벤트'],
            series: [
                {
                    name: '1개 이상',
                    data: 50,
                },
                {
                    name: "5개 이상",
                    data: 20
                }
            ]
        }} options={{
            chart: { width: 500, height: 500 },
            usageStatistics: false,
        }} />
        </>
    )
}

