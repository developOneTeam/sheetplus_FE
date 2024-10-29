import { stamp, stamped } from "../styles/layouts.css";

export default function stamps(festival: { eventCounts: string }) {
    const total = [];

    for (let i = 0; i < 5; i++) {
        total.push(
            <div key={i} className={stamp}>
                {i < parseInt(festival.eventCounts) ? 
                    <div className={`${stamped} material-symbols-rounded`}>approval</div> :
                    <div className={`${stamped} material-symbols-rounded`}>hide_source</div>
                }
            </div>
        )
    }

    return total;
}