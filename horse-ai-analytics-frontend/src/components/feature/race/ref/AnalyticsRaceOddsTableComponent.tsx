"use client";

import React, { FC } from "react";

import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OddsInfoResponse } from "@/query/graphqlGen/graphql";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Props = {
  oddsInfo: OddsInfoResponse;
};

export const AnalyticsRaceOddsTableComponent: FC<Props> = ({ oddsInfo }) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <Label>オッズ</Label>
        <Link href={oddsInfo.oddsUrl} target="_blank">
          <ExternalLink />
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableHead>馬名</TableHead>
          <TableHead className="w-[80px] text-right">オッズ</TableHead>
        </TableHeader>
        <TableBody>
          {oddsInfo.oddsList.map((odds, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{odds.horseName}</TableCell>
                <TableCell className="text-right">{odds.odds}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
