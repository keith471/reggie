# Fixing CloudStack-related issues in Terraform 0.6.14

1. Replace deprecated arguments
  - This isn't necessary but nice to do if you don't want Terraform to complain every you run `terraform plan`
  - Running `terraform plan` or `terraform refresh` will cause Terraform to spit out a list of arguments that are deprecated and the new ones they should be replaced with
2. Add the `project` argument
  - The `project` argument is available on a subset of CloudStack resources
  - It is optional on all resources it is available on but can cause issues if not present and, as such, we recommend it be included where at all possible
    - e.g. Adding it to our `cloudstack_port_forward` rules fixed the issues we had with port forwarding
      - `project = "87e89a5d-77c2-4cc8-acdd-2956f0854154"`
3. Fixes to come in **Terraform 0.7**
  - Issues with static NAT creation are related to a bug that is fixed in the upcoming [release](https://releases.hashicorp.com/terraform/0.7.0-rc2/)

# Notes
There is a bug with `cloudstack_loadbalancer_rule` and `cloudstack_static_nat` where neither resource is added to the tfstate file after successful creation. It's been 
