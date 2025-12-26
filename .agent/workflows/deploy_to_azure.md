---
description: Deploy Backend and Database to Azure
---

# Deploy User Management Backend to Azure

This workflow guides you through deploying your Node.js backend and MySQL database to Microsoft Azure.

## Prerequisites
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed and logged in (`az login`).
- `mysql` client installed (for importing the database schema).

## Step 1: Create a Resource Group
Create a logical group for all your resources.
```bash
az group create --name BookstoreResourceGroup --location eastus
```

## Step 2: Set up Azure Database for MySQL
Create a flexible server. This may take a few minutes.
```bash
az mysql flexible-server create \
  --resource-group BookstoreResourceGroup \
  --name bookstore-db-server \
  --location eastus \
  --admin-user bookstoreadmin \
  --admin-password SecurePassword123! \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --version 8.0.21
```
> **Note:** Replace `SecurePassword123!` with a strong password of your choice.

### Configure Firewall
Allow access from Azure services (for the backend app) and your local IP (for importing data).
```bash
# Allow Azure services
az mysql flexible-server firewall-rule create \
  --resource-group BookstoreResourceGroup \
  --name bookstore-db-server \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Allow local IP (auto-detects)
az mysql flexible-server firewall-rule create \
  --resource-group BookstoreResourceGroup \
  --name bookstore-db-server \
  --rule-name AllowMyIP \
  --start-ip-address <YOUR_IP_ADDRESS> \
  --end-ip-address <YOUR_IP_ADDRESS>
```

### Create the Database
Create an empty database named `bookstore` to import your data into.
```bash
az mysql flexible-server db create \
  --resource-group BookstoreResourceGroup \
  --server-name bookstore-db-server \
  --database-name bookstore
```

## Step 3: Import Database Schema
Connect to the Azure database and import your `BookstoreDB.sql`.
```bash
mysql -h bookstore-db-server.mysql.database.azure.com -u bookstoreadmin -p --ssl-mode=REQUIRED bookstore < database/BookstoreDB.sql
```
*When prompted, enter the password you set in Step 2.*

## Step 4: Deploy the Node.js Backend
Create an App Service Plan and Web App.

### Create App Service Plan
```bash
az appservice plan create \
  --name BookstoreAppPlan \
  --resource-group BookstoreResourceGroup \
  --sku F1 \
  --is-linux
```

### Create Web App
```bash
az webapp create \
  --resource-group BookstoreResourceGroup \
  --plan BookstoreAppPlan \
  --name bookstore-api-app \
  --runtime "NODE:18-lts"
```
*Note: The name `bookstore-api-app` must be globally unique. You may need to add random numbers to it.*

### Configure Environment Variables
Set the database connection details in the app settings.
```bash
az webapp config appsettings set \
  --resource-group BookstoreResourceGroup \
  --name bookstore-api-app \
  --settings \
  DB_HOST="bookstore-db-server.mysql.database.azure.com" \
  DB_USER="bookstoreadmin" \
  DB_PASS="SecurePassword123!" \
  DB_NAME="bookstore" \
  PORT="8080"
```

### Deploy Code via Zip
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Compress the server files (excluding `node_modules`):
   **Mac/Linux:**
   ```bash
   zip -r ../server.zip . -x "node_modules/*" ".env"
   ```
3. Deploy the zip file:
   ```bash
   az webapp deployment source config-zip \
     --resource-group BookstoreResourceGroup \
     --name bookstore-api-app \
     --src ../server.zip
   ```

## Step 5: Verify Deployment
Get your backend URL:
```bash
echo "http://$(az webapp show --resource-group BookstoreResourceGroup --name bookstore-api-app --query defaultHostName -o tsv)"
```
Visit the URL in your browser. You should see "Route not found" or your API response if you hit a valid endpoint like `/api/books/search`.

## Step 6: Update Frontend (Optional)
If you are deploying the frontend, remember to update your frontend's API base URL to point to your new Azure backend URL.
