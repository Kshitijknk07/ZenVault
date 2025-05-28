output "zenvault_uploader_access_key_id" {
  description = "Access key ID for ZenVault uploader"
  value       = aws_iam_access_key.zenvault_uploader_key.id
}

output "zenvault_uploader_secret_access_key" {
  description = "Secret access key for ZenVault uploader"
  value       = aws_iam_access_key.zenvault_uploader_key.secret
  sensitive   = true
}
