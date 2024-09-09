/* este sería un adaptador, porque vamos a adaptar el uso de un paquete de terceros ya que si en el futuro queremos cambiar de paquete entonces el único punto para hacer los cambios sería en este archivo */
/* bcrypt utiliza un algoritmo de hash de una sola vía, lo que significa que una vez que la contraseña se pasa por bcrypt y se encripta, no hay forma de volver atrás y descubrir cuál era la contraseña original, ni siquiera el administrador de la base de datos puede saber su valor, una vez que la contraseña es encriptada, no puedes desencriptarla para obtener la original, y eso es precisamente lo que lo hace tan seguro */

import { compareSync, genSaltSync, hashSync } from "bcryptjs";

/* genSaltSync -> serán la cantidad de vueltas que se hará */
/* hashSync -> va a impedir que se vuelva a recuperar y en este caso no vamos a saber qué contraseña colocó el usuario. Lo cual esto es conveniente por si por A o B la base de datos está comprometida con algún virus o algo malo, entonces no vamos a saber las contraseñas de los usuarios y eso es la encriptación de una sola vía, es decir, no vamos a poder reconstruir la encriptación a la forma original */
/* compareSync -> para comparar y verificar si la contraseña nueva hace match con el hash que se tiene anteriormente. Dos contraseñas aunque sean iguales NUNCA van a generar el mismo hash */
export const bcryptAdapter = {
  /* aquí se hará como un objeto con sus métodos, pero también se puede hacer como una clase con sus métodos estáticos tal cual estamos trabajando en el proyecto pero vamos a usar otra forma de poder trabajar las mismas cosas o funcionalidades */
  hash: (password: string) => {
    const salt = genSaltSync(); // si no se manda nada entonces por defecto son 10 vueltas
    return hashSync(password, salt);
  },

  compare: (password: string, hashedPassword: string) => {
    return compareSync(password, hashedPassword); // vamos a regresar el producto de la comparación lo cual podría ser un true o un false
  },
};
