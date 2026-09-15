import React from "react";

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyInput {
  name: string;
  website?: string;
  industry?: string;
  description?: string;
}

export interface UpdateCompanyInput {
  name?: string;
  website?: string;
  industry?: string;
  description?: string;
}

export interface CompanyFormData {
  name: string;
  website: string;
  industry: string;
  description: string;
}
