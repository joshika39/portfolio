"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Result = {
    name: string;
    score: number;
};

export const getStaticProps = async () => {
    const res = await fetch("https://api.bitof.faith/tron/");
    const data = await res.json();

    return {
        props: { scores: data },
    };

}

export default function Tron({ scores }: { scores: Result[] }) {
    return (
        <div className="tron">
            <h1 className={"text-3xl"}>Tron</h1>

            <Table>
                <TableCaption>Records for the game</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Username</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {scores.map((score) => (
                        <TableRow key={score.name}>
                            <TableCell>{score.name}</TableCell>
                            <TableCell className="text-center">{score.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

}