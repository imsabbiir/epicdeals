"use client";

import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

export default function PaginationComponent({ pagination, categorySlug, subCategorySlug, minPrice, maxPrice }) {
  const router = useRouter();

  const handleChange = (event, value) => {
    router.push(
      `?categorySlug=${categorySlug}&subCategorySlug=${subCategorySlug}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${value}#product-section`
    );
  };

  return (
    <div className="flex justify-center mt-8 px-4 sm:px-6">
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }} // vertical on very small screens, horizontal otherwise
        alignItems="center"
      >
        <Pagination
          count={pagination?.totalPages || 1}
          page={pagination?.currentPage || 1}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          size="medium"
          siblingCount={1} // fewer items on small screens
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "10px",
              fontWeight: 600,
              minWidth: { xs: 32, sm: 40 }, // smaller buttons on mobile
              height: { xs: 32, sm: 40 },
              fontSize: { xs: "0.8rem", sm: "1rem" },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              background: "#2b7fff",
              color: "#fff",
            },
            "& .MuiPaginationItem-root:hover": {
              transform: "scale(1.05)",
              transition: "0.2s",
            },
          }}
        />
      </Stack>
    </div>
  );
}
