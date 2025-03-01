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
        <div className="actionPage">
            <h2 className="res">Results for "{test.name}"</h2>
            <h4 className="additText">Type: {test.type}</h4>
            <h4 className="additText">Status: {test.status}</h4>
        </div>
    );
};

export default Results;

