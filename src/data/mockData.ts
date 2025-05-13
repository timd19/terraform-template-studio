
export interface Template {
  id: string;
  name: string;
  description: string;
  provider: "azure" | "aws" | "gcp";
  category: string;
  stars: number;
  deployments: number;
  templateContent: string;
}

export const templates: Template[] = [
  {
    id: "1",
    name: "Web App with Database",
    description: "Deploy a web application with a managed database in Azure.",
    provider: "azure",
    category: "Web Applications",
    stars: 142,
    deployments: 1289,
    templateContent: `resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "West Europe"
}

resource "azurerm_app_service_plan" "example" {
  name                = "example-appserviceplan"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_app_service" "example" {
  name                = "example-app-service"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  app_service_plan_id = azurerm_app_service_plan.example.id

  site_config {
    dotnet_framework_version = "v4.0"
    scm_type                 = "LocalGit"
  }

  app_settings = {
    "SOME_KEY" = "some-value"
  }
}`,
  },
  {
    id: "2",
    name: "S3 Bucket with CloudFront",
    description: "Create an S3 bucket with CloudFront distribution for static website hosting.",
    provider: "aws",
    category: "Storage",
    stars: 98,
    deployments: 876,
    templateContent: `resource "aws_s3_bucket" "example" {
  bucket = "my-tf-example-bucket"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.example.bucket_regional_domain_name
    origin_id   = "myS3Origin"
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Some comment"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "myS3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}`,
  },
  {
    id: "3",
    name: "GKE Cluster",
    description: "Set up a Google Kubernetes Engine (GKE) cluster.",
    provider: "gcp",
    category: "Containers",
    stars: 76,
    deployments: 543,
    templateContent: `resource "google_container_cluster" "primary" {
  name     = "my-gke-cluster"
  location = "us-central1"

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "my-node-pool"
  location   = "us-central1"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    preemptible  = true
    machine_type = "e2-medium"

    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}`,
  },
  {
    id: "4",
    name: "Virtual Network",
    description: "Create a virtual network with subnets in Azure.",
    provider: "azure",
    category: "Networking",
    stars: 54,
    deployments: 423,
    templateContent: `resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "West Europe"
}

resource "azurerm_virtual_network" "example" {
  name                = "example-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

resource "azurerm_subnet" "example" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.2.0/24"]
}`,
  },
  {
    id: "5",
    name: "ECS Cluster",
    description: "Deploy an Amazon ECS cluster with Fargate launch type.",
    provider: "aws",
    category: "Containers",
    stars: 63,
    deployments: 387,
    templateContent: `resource "aws_ecs_cluster" "main" {
  name = "my-cluster"
}

resource "aws_ecs_task_definition" "app" {
  family                   = "app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name      = "first"
      image     = "nginx"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "main" {
  name            = "my-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 3
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip = true
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private.*.id
  }
}`,
  },
  {
    id: "6",
    name: "Cloud SQL Instance",
    description: "Create a PostgreSQL instance on Google Cloud SQL.",
    provider: "gcp",
    category: "Databases",
    stars: 47,
    deployments: 298,
    templateContent: `resource "google_sql_database_instance" "master" {
  name             = "master-instance"
  database_version = "POSTGRES_13"
  region           = "us-central1"

  settings {
    # Second-generation instance tiers are based on the machine
    # type. See argument reference below.
    tier = "db-f1-micro"
  }
}

resource "google_sql_database" "database" {
  name     = "my-database"
  instance = google_sql_database_instance.master.name
}

resource "google_sql_user" "users" {
  name     = "my-user"
  instance = google_sql_database_instance.master.name
  password = "changeme"
}`,
  },
];

export const categories = [
  "All",
  "Web Applications",
  "Databases",
  "Storage",
  "Networking",
  "Containers",
  "Serverless",
  "Monitoring",
  "Security",
];

export const providers = [
  { id: "all", name: "All Providers" },
  { id: "aws", name: "Amazon Web Services", color: "bg-yellow-600" },
  { id: "azure", name: "Microsoft Azure", color: "bg-blue-600" },
  { id: "gcp", name: "Google Cloud Platform", color: "bg-red-600" },
];
