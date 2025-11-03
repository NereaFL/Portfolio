# ---- Build stage ----
FROM eclipse-temurin:17-jdk-jammy AS build

WORKDIR /app

# Copiamos wrapper y pom primero para cachear dependencias
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Damos permisos al wrapper
RUN chmod +x mvnw

# Descargamos dependencias
RUN ./mvnw -q dependency:go-offline

# Copiamos el código fuente y compilamos
COPY src src
RUN ./mvnw -q clean package -DskipTests

# ---- Runtime stage ----
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Copiamos el jar compilado y lo dejamos como app.jar
COPY --from=build /app/target/portfolio-0.0.1-SNAPSHOT.jar /app/app.jar

# Render usa un puerto dinámico ($PORT)
EXPOSE 8080
CMD ["sh", "-c", "java -Dserver.port=$PORT -jar /app/app.jar"]
