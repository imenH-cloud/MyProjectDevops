# Déclaration de la VPC
resource "aws_vpc" "pfe" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "pfe-vpc"
  }
}

# Création des sous-réseaux publics
resource "aws_subnet" "public-subnet-1" {
  vpc_id                  = aws_vpc.pfe.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-west-3a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-1"
  }
}

resource "aws_subnet" "public-subnet-2" {
  vpc_id                  = aws_vpc.pfe.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "eu-west-3b"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-2"
  }
}

# Création des sous-réseaux privés
resource "aws_subnet" "private-subnet-1" {
  vpc_id            = aws_vpc.pfe.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "eu-west-3a"

  tags = {
    Name = "private-subnet-1"
  }
}

resource "aws_subnet" "private-subnet-2" {
  vpc_id            = aws_vpc.pfe.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "eu-west-3b"

  tags = {
    Name = "private-subnet-2"
  }
}

resource "aws_subnet" "private-subnet-3" {
  vpc_id            = aws_vpc.pfe.id
  cidr_block        = "10.0.5.0/24"
  availability_zone = "eu-west-3c"

  tags = {
    Name = "private-subnet-3"
  }
}

resource "aws_subnet" "private-subnet-4" {
  vpc_id            = aws_vpc.pfe.id
  cidr_block        = "10.0.6.0/24"
  availability_zone = "eu-west-3c"

  tags = {
    Name = "private-subnet-4"
  }
}

# Création de la table de routage publique
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.pfe.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.pfe.id
  }

  tags = {
    Name = "public-route-table"
  }
}

# Création de la table de routage privée pour private-subnet-1 et private-subnet-3
resource "aws_route_table" "private-1-3" {
  vpc_id = aws_vpc.pfe.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.pfe.id
  }

  tags = {
    Name = "private-route-table-1-3"
  }
}

# Création de la table de routage privée pour private-subnet-2 et private-subnet-4
resource "aws_route_table" "private-2-4" {
  vpc_id = aws_vpc.pfe.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.pfe.id
  }

  tags = {
    Name = "private-route-table-2-4"
  }
}

# Association des sous-réseaux publics avec la table de routage publique
resource "aws_route_table_association" "public-subnet-1" {
  subnet_id      = aws_subnet.public-subnet-1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public-subnet-2" {
  subnet_id      = aws_subnet.public-subnet-2.id
  route_table_id = aws_route_table.public.id
}

# Association des sous-réseaux privés avec leurs tables de routage respectives
resource "aws_route_table_association" "private-subnet-1" {
  subnet_id      = aws_subnet.private-subnet-1.id
  route_table_id = aws_route_table.private-1-3.id
}

resource "aws_route_table_association" "private-subnet-2" {
  subnet_id      = aws_subnet.private-subnet-2.id
  route_table_id = aws_route_table.private-2-4.id
}

resource "aws_route_table_association" "private-subnet-3" {
  subnet_id      = aws_subnet.private-subnet-3.id
  route_table_id = aws_route_table.private-1-3.id
}

resource "aws_route_table_association" "private-subnet-4" {
  subnet_id      = aws_subnet.private-subnet-4.id
  route_table_id = aws_route_table.private-2-4.id
}

# Création de l'Internet Gateway pour la table de routage publique
resource "aws_internet_gateway" "pfe" {
  vpc_id = aws_vpc.pfe.id

  tags = {
    Name = "app-internet-gateway"
  }
}
# Création de la NAT Gateway pour les sous-réseaux privés 
resource "aws_nat_gateway" "pfe" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public-subnet-1.id

  tags = {
    Name = "app-nat-gateway"
  }
}

# Elastic IP pour la NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"
}
#outputs
output "vpc_id" {
  value = aws_vpc.pfe.id
}

# Assurez-vous que les sous-réseaux sont correctement déclarés
output "subnet_id_public_1" {
  value = aws_subnet.public-subnet-1.id
}

output "subnet_id_private_1" {
  value = aws_subnet.private-subnet-1.id
}

output "subnet_id_private_2" {
  value = aws_subnet.private-subnet-2.id
}

output "subnet_id_private_3" {
  value = aws_subnet.private-subnet-3.id
}

output "subnet_id_private_4" {
  value = aws_subnet.private-subnet-4.id
}

