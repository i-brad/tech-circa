import {
  createClient,
  type ClientConfig,
  type QueryParams,
} from "@sanity/client";
import { apiVersion, dataset, projectId, useCdn } from "./config";
import {
  allauthorsquery,
  authorsquery,
  catpathquery,
  catquery,
  configQuery,
  getAll,
  limitquery,
  paginatedquery,
  pathquery,
  postquery,
  postsbyauthorquery,
  postsbycatquery,
  searchquery,
  singlequery
} from "./groq";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: process.env.NODE_ENV === "development" ? true : false, })
  : null;

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams: QueryParams;
  tags: string[];
}): Promise<QueryResponse | []> {
  return client ? client.fetch<QueryResponse>(query, qParams, {
    cache: "force-cache",
    next: { tags },
  }) : [];
}
export const fetcher = async ([query, params]) => {
  return client ? client.fetch(query, params) : [];
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?"
      );
    }
  }
})();

export async function getAllPosts() {
  if (client) {
    return (await client.fetch(postquery, {}, {
      next: {
        tags: ["post"]
      }
    })) || [];
  }
  return [];
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery, {}, {
      next: {
        tags: ["settings"]
      }
    })) || [];
  }
  return [];
}

export async function getPostBySlug(slug) {
  if (client) {
    return (await client.fetch(singlequery, { slug }, {
      next: {
        tags: ["post"]
      }
    })) || {};
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery, {}, {
      next: {
        tags: ["post"]
      }
    })) || [];
    return slugs.map(slug => ({ slug }));
  }
  return [];
}
// Author
export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs = (await client.fetch(authorsquery, {}, {
      next: {
        tags: ["author"]
      }
    })) || [];
    return slugs.map(slug => ({ author: slug }));
  }
  return [];
}

export async function getAuthorPostsBySlug(slug) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug }, {
      next: {
        tags: ["post"]
      }
    })) || {};
  }
  return {};
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery, {}, {
      next: {
        tags: ["author"]
      }
    })) || [];
  }
  return [];
}

// Category

export async function getAllCategories() {
  if (client) {
    const slugs = (await client.fetch(catpathquery, {}, {
      next: {
        tags: ["category"]
      }
    })) || [];
    return slugs.map(slug => ({ category: slug }));
  }
  return [];
}

export async function getPostsByCategory(slug) {
  if (client) {
    return (await client.fetch(postsbycatquery, { slug }, {
      next: {
        tags: ["post"]
      }
    })) || {};
  }
  return {};
}

export async function getTopCategories() {
  if (client) {
    return (await client.fetch(catquery, {}, {
      next: {
        tags: ["category"]
      }
    })) || [];
  }
  return [];
}

export async function getPaginatedPosts({ limit, pageIndex = 0 }) {
  if (client) {
    return (
      (await client.fetch(paginatedquery, {
        pageIndex: pageIndex,
        limit: limit
      }, {
        next: {
          tags: ["post"]
        }
      })) || []
    );
  }
  return [];
}
