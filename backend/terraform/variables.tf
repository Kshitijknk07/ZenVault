variable "aws_region" {
  description = "AWS region for deploying resources"
  type        = string
  default     = "ap-south-1"
}

variable "zenvault_bucket_name" {
  description = "Name of the S3 bucket for ZenVault uploads"
  type        = string
}
