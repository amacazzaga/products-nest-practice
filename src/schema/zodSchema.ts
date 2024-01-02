import { z } from 'zod';


// este es el esquema lisa y llanamente que el body de la request debera cumplir para ejecutar el metodo de post, es pasado al controlador con UsePipes()
export const createProductSchema = z
  .object({
    name: z.string(),
    price: z.number(),
    description: z.string(),
  })
  .required();

export type CreateProductDto = z.infer<typeof createProductSchema>;

/*

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
*/ //asi podemos crear el esquema de validacion usando clases tambien, a modo loopback