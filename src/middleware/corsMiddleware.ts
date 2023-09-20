export const corsOptions = {
  origin: "http://localhost:3000", // Cambia esto según la URL de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
