import { api } from "./api";

export type PublicPostDto = {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  category?: any;
  createdAt?: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export async function getPublicPosts(params?: {
  q?: string;
  page?: number;
  limit?: number;
}): Promise<Paginated<PublicPostDto>> {
  const { data } = await api.get<Paginated<PublicPostDto>>("/posts", {
    params: {
      q: params?.q || undefined,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    },
  });
  return data;
}

export async function getPublicPostById(id: string): Promise<PublicPostDto> {
  const { data } = await api.get<PublicPostDto>(`/posts/${id}`);
  return data;
}



export type SuccessResponseDto<T = any> = {
  success: true;
  message: string;
  data: T;
};

export type PaginateMeta = {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type PaginateLinks = {
  first?: string;
  previous?: string;
  next?: string;
  last?: string;
};

export type PaginationDto<T> = {
  items: T[];
  meta: PaginateMeta;
  links?: PaginateLinks;
};

export type CategoryRefDto = {
  id: string;
  name: string;
};

export type PostDto = {
  id: string;
  title: string;
  content: string;
  categoryId?: string | null;
  category?: CategoryRefDto | null;
};

export async function getPosts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  searchField?: string;
  sort?: string;
  order?: "ASC" | "DESC";
}): Promise<PaginationDto<PostDto>> {
  const { data } = await api.get<SuccessResponseDto<PaginationDto<PostDto>>>("/posts", {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      search: params?.search || undefined,
      searchField: params?.searchField || undefined,
      sort: params?.sort || undefined,
      order: params?.order || undefined,
    },
  });
  return data.data;
}

export async function createPost(payload: {
  title: string;
  content: string;
  categoryId?: string | null;
}): Promise<PostDto> {
  const { data } = await api.post<SuccessResponseDto<PostDto>>("/posts", payload);
  return data.data;
}

export async function updatePost(
  id: string,
  payload: {
    title: string;
    content: string;
    categoryId?: string | null;
  }
): Promise<PostDto> {
  const { data } = await api.put<SuccessResponseDto<PostDto>>(`/posts/${id}`, payload);
  return data.data;
}

export async function deletePost(id: string): Promise<PostDto> {
  const { data } = await api.delete<SuccessResponseDto<PostDto>>(`/posts/${id}`);
  return data.data;
}