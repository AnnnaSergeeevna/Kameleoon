import React, { useState, useEffect, useMemo } from "react";
import classNames from "./Table";
import "./Table.css";
import { getTests, getSites } from "../api/api";
import { useNavigate } from "react-router-dom";
interface Test {
    id: number;
    name: string;
    type: "CLASSIC" | "SERVER_SIDE" | "MVT";
    status: "DRAFT" | "ONLINE" | "PAUSED" | "STOPPED";
    siteId: number;
}

interface Site {
    id: number;
    url: string;
}

const statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];


const Table = () => {
    const [tests, setTests] = useState<Test[]>([]);
    const [sites, setSites] = useState<Site[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof Test | "site">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    const handleNavigate = (testId, status) => {
        if (status === "ONLINE") {
            navigate(`/finalize/${testId}`);
        } else {
            navigate(`/results/${testId}`);
        }
    };
    useEffect(() => {
        getTests().then((res) => setTests(res.data));
        getSites().then((res) => setSites(res.data));
    }, []);

    const getSiteName = (siteId: number) => {
        const site = sites.find((s) => s.id === siteId);
        return site ? site.url.replace(/https?:\/\/(www\.)?/, "") : "";
    };

    const filteredTests = useMemo(() => {
        return tests.filter((test) =>
            test.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [tests, filter]);

    const sortedTests = useMemo(() => {
        return [...filteredTests].sort((a, b) => {
            if (sortColumn === "status") {
                return (
                    (statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)) *
                    (sortOrder === "asc" ? 1 : -1)
                );
            }
            const aValue = sortColumn === "site" ? getSiteName(a.siteId) : a[sortColumn];
            const bValue = sortColumn === "site" ? getSiteName(b.siteId) : b[sortColumn];
            return (aValue > bValue ? 1 : -1) * (sortOrder === "asc" ? 1 : -1);
        });
    }, [filteredTests, sortColumn, sortOrder]);

    return (
        <>
            <h2 className="dash">Dashboard</h2>
            <input
                className="searchInpt"
                type="text"
                placeholder="What test are you looking for?"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className="table-cont">
                {sortedTests.length === 0 ? (
                    <div>
                        <p>Your search did not match any results.</p>
                        <button onClick={() => setFilter("")}>Reset</button>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                {(["name", "type", "status", "site"] as const).map((col) => (
                                    <th
                                        key={col}
                                        onClick={() => {
                                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                            setSortColumn(col);
                                        }}
                                    >
                                        {col.toUpperCase()} {sortColumn === col ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                ))}
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTests.map((test) => {
                                const siteColor = {
                                    "market.company.com": "site-market",
                                    "games.company.com": "site-games",
                                    "delivery.company.com": "site-delivery"
                                }[getSiteName(test.siteId)] || "site-default";

                                return (
                                    <tr key={test.id}>
                                        <td className="table-row">
                                            <div className={`site-indicator ${siteColor}`}></div>
                                            {test.name}
                                        </td>
                                        <td>{test.type}</td>
                                        <td>{test.status}</td>
                                        <td>{getSiteName(test.siteId)}</td>
                                        <td>
                                            <button
                                                className={test.status === "ONLINE" ? "btn btn-finalize" : "btn btn-results"}
                                                onClick={() => handleNavigate(test.id, test.status)}
                                            >
                                                {test.status === "ONLINE" ? "Finalize" : "Results"}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                )}
            </div>
        </>
    );

};

export default Table;
