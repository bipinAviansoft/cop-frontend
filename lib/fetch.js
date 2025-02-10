import { cookies } from "next/headers";

export const fetchData = async (endpoint) => {
  const cookieStore = cookies();

  const city = cookieStore.get("city")?.value || "";
  const jwt = cookieStore.get("jwt")?.value || "";

  const options = {
    headers: {
      Cookie: `jwt=${jwt};city=${city}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${endpoint}`,
    options
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;

    if (response.status === 401 || response.status === 400) {
      return null;
    }

    throw new Error(message || `${endpoint} | API Failed!`);
  }

  const data = await response.json();
  return data;
};

export const fetchBlogs = async () => {
  const response = await fetch(process.env.WP_BLOGS_API_URL);
  const data = await response.json();

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || "Blogs API Failed!");
  }

  return data;
};

export const queryModels = async (endpoint, page, sortByPrice, filters) => {
  const cookieStore = cookies();

  const city = cookieStore.get("city")?.value || "";
  const jwt = cookieStore.get("jwt")?.value || "";
  const options = {
    headers: {
      Cookie: `jwt=${jwt};city=${city}`,
    },
  };

  const params = {
    page,
    ...filters,
  };

  if (sortByPrice) {
    params.sort = sortByPrice;
  }

  const queryParams = new URLSearchParams(params);

  queryParams.set("limit", 12);

  if (!queryParams.get("minPrice")) {
    queryParams.set("minPrice", 200000);
  }

  if (!queryParams.get("maxPrice")) {
    queryParams.set("maxPrice", 200000000);
  }

  if (
    endpoint.startsWith("/newly-launched-cars") &&
    !queryParams.get("launchMonth")
  ) {
    queryParams.set("launchMonth", 3);
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_API_URL
    }${endpoint}?${queryParams.toString()}`,
    options
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(
      message || `${endpoint}?${queryParams.toString()}} | API Failed!`
    );
  }

  const data = await response.json();
  return data;
};

export const fetchFilters = async (filterEndPoint, filters) => {
  const cookieStore = cookies();
  const city = cookieStore.get("city")?.value || "";

  const queryParams = new URLSearchParams({
    ...filters,
  });

  if (!queryParams.get("minPrice")) {
    queryParams.set("minPrice", 200000);
  }

  if (!queryParams.get("maxPrice")) {
    queryParams.set("maxPrice", 200000000);
  }

  if (
    filterEndPoint.startsWith("/newly-launched-cars") &&
    !queryParams.get("launchMonth")
  ) {
    queryParams.set("launchMonth", 3);
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_API_URL
    }${filterEndPoint}?${queryParams.toString()}`,
    {
      headers: {
        Cookie: `city=${city}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(
      message ||
        `/advanced-search/${filterEndPoint}?${queryParams.toString()} | API Failed!`
    );
  }

  const data = await response.json();
  return data;
};

export const fetchMetaData = async (bodyData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/seo/meta-data`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    }
  );

  const data = await response.json();

  if (!data || !Array.isArray(data) || data?.length < 1) {
    return {
      title: "CarOnPhone - Explore and Buy New Cars in India",
      description:
        "Explore the latest car models of all brands, reviews, and news on CarOnPhone. Find your perfect car from top brands like Tata, Maruti, Toyota, Hyundai, and more.",
      keywords: "",
    };
  }

  // Convert array response into an object for easy access
  const meta = data.reduce((acc, item) => {
    if (item.meta_tag_name && item.tag_content) {
      acc[item.meta_tag_name] = item.tag_content;
    }
    return acc;
  }, {});

  const metadata = {
    title: meta.title || "",
    description: meta.description || "",
    keywords: meta.keywords || "",
    openGraph: {
      title: meta["og:title"] || meta.title || "",
      description: meta["og:description"] || meta.description || "",
      url: meta["og:url"] || "https://caronphone.com/",
      siteName: meta["og:site_name"] || "CarOnPhone",
      images: [
        {
          url:
            meta["og:image"] ||
            "https://static.caronphone.com/public/brands/31/585/585.webp",
          width: 1200,
          height: 630,
        },
      ],
      type: meta["og:type"] || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta["twitter:title"] || meta.title || "",
      description: meta["twitter:description"] || meta.description || "",
      image:
        meta["twitter:image"] ||
        "https://static.caronphone.com/public/brands/31/585/585.webp",
    },
  };

  return metadata;
};
