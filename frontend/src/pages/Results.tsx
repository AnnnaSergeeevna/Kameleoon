import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTests } from "../api/api";

interface Test {
    id: number;
    name: string;
    type: "CLASSIC" | "SERVER_SIDE" | "MVT";
    status: "DRAFT" | "ONLINE" | "PAUSED" | "STOPPED";
    siteId: number;
}
const Results = () => {
    const { testId } = useParams();
    const [test, setTest] = useState<Test | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTests().then((res) => {
            const foundTest = res.data.find((t) => t.id.toString() === testId);
            setTest(foundTest);
            setLoading(false);
        });
    }, [testId]);

    if (loading) return <p>Loading...</p>;
    if (!test) return <p>Test not found</p>;

    return (
        <div>
            <h2 className="res">Results for "{test.name}"</h2>
            <p className="additText">Type: {test.type}</p>
            <p className="additText">Status: {test.status}</p>
        </div>
    );
};

export default Results;

