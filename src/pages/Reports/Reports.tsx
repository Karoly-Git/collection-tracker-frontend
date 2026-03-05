import CollectionsPerHourChart from "@/components/charts/CollectionsPerHourChart/CollectionsPerHourChart";
import "./Reports.scss";

export default function Reports() {
    return (
        <div className="reports">

            <h1 className="reports__title">Reports</h1>

            {/* KPI SUMMARY */}
            <section className="reports__kpis">

                <div className="reports__card">
                    <h3>Total collections</h3>
                    <p className="reports__value">47</p>
                </div>

                <div className="reports__card">
                    <h3>Average loading time</h3>
                    <p className="reports__value">38 min</p>
                </div>

            </section>


            {/* LONGEST WAITING COLLECTIONS */}
            <section className="reports__section">
                <h2>Longest waiting collections</h2>

                <table className="reports__table">
                    <thead>
                        <tr>
                            <th>Lorry</th>
                            <th>Customer</th>
                            <th>Waiting time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AB123</td>
                            <td>Steel Ltd</td>
                            <td>2h 40m</td>
                        </tr>
                        <tr>
                            <td>ZX991</td>
                            <td>MetalWorks</td>
                            <td>2h 12m</td>
                        </tr>
                    </tbody>
                </table>
            </section>


            {/* COLLECTIONS PER HOUR */}
            <section className="reports__section">
                <h2>Collections per hour</h2>

                <CollectionsPerHourChart />
            </section>


            {/* AM vs PM */}
            <section className="reports__section">
                <h2>AM vs PM metrics</h2>

                <div className="reports__grid">

                    <div className="reports__card">
                        <h3>AM collections</h3>
                        <p className="reports__value">21</p>
                    </div>

                    <div className="reports__card">
                        <h3>PM collections</h3>
                        <p className="reports__value">26</p>
                    </div>

                    <div className="reports__card">
                        <h3>AM average loading</h3>
                        <p className="reports__value">34 min</p>
                    </div>

                    <div className="reports__card">
                        <h3>PM average loading</h3>
                        <p className="reports__value">41 min</p>
                    </div>

                </div>
            </section>


            {/* AVG LOADING BY CUSTOMER */}
            <section className="reports__section">
                <h2>Average loading time by customer</h2>

                <table className="reports__table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Average loading</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Steel Ltd</td>
                            <td>34 min</td>
                        </tr>

                        <tr>
                            <td>MetalWorks</td>
                            <td>42 min</td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </div>
    );
}