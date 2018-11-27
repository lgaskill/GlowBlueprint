import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../config/constants";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";

@Injectable()
export class BlogService {
  constructor(private apiService: ApiService) {}

  async getAllBlogPosts(): Promise<BlogPost[]> {
    const blogPosts: BlogPost[] = await this.apiService.get<BlogPost[]>(
      "/blog_post"
    );
    if (!blogPosts) {
      return null;
    }

    for (const bp of blogPosts) {
      this.formatBlogPost(bp);
    }
    return blogPosts;
  }

  async getBlogPostById(blogPostID: string): Promise<BlogPost> {
    return this.apiService.get<BlogPost>(`/blog_post/${blogPostID}`);
  }

  async createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    return this.apiService.post<BlogPost>("/blog_post", blogPost);
  }

  async updateBlogPost(patchObj: any): Promise<BlogPost> {
    return this.apiService.patch<BlogPost>("/blog_post", patchObj);
  }

  private formatBlogPost(blogPost: BlogPost) {
    blogPost.createdAt = blogPost.createdAt
      ? new Date(blogPost.createdAt)
      : null;
    blogPost.lastUpdatedAt = blogPost.lastUpdatedAt
      ? new Date(blogPost.lastUpdatedAt)
      : null;
  }
}