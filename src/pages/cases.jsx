import { Stack, Text } from "@chakra-ui/react";
import Button from "components/base/button";
import Layout from "components/layout";
import Table from "components/table";
import useApiClinet from "hooks/api";
import React from "react";

export default function Cases() {
  const headers = [
    { header: "Case ID", accessorKey: "id", id: "id" },
    { header: "Owner ID", accessorKey: "owner_id", id: "owner_id" },
    { header: "category", accessorKey: "category", id: "category" },
    { header: "Description", accessorKey: "description", id: "description" },
    { header: "Date", accessorKey: "date_time", id: "date_time" }
  ];
  
  const { loading, data } = useApiClinet("/admin/get-casses");
  return (
    <Layout name="Cases">
      <Table loading={loading} columns={headers} data={data.docs || []} />
    </Layout>
  );
}
