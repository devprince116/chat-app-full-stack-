declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean
}