# Base runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ProtfolioMVC.csproj", "."]
RUN dotnet restore "./ProtfolioMVC.csproj"
COPY . .
RUN dotnet build "./ProtfolioMVC.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "./ProtfolioMVC.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProtfolioMVC.dll"]
