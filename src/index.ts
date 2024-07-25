import Elysia from "elysia";
import { Accepts } from "@tinyhttp/accepts";

export function accepts() {
  return new Elysia({ name: "accepts" })
    .derive({ as: "global" }, ({ headers }) => {
      const accept = new Accepts({ headers });

      return {
        /** Return the first accepted charset.
         * When used as property acts the same as `charsets`.
         *
         * @param charsets {string[]} The charsets to accept.
         * @returns {string[] | string | false} The first accepted charset or false if nothing is accepted.
         * @deprecated Do not use this header. Browsers omit this header and servers should ignore it.
         */
        charset: accept.charset.bind(accept),

        /** Return the charsets that the request accepts, in the order of the client's preference (most preferred first).
         * Can be used as both property and method.
         *
         * @returns {string[]} The charsets that the request accepts, in the order of the client's preference (most preferred first).
         * @deprecated Do not use this header. Browsers omit this header and servers should ignore it.
         */
        charsets: accept.charsets.bind(accept),

        /** Return the first accepted encoding.
         * If nothing in encodings is accepted, then false is returned.
         * When used as property acts the same as `encodings`.
         *
         * @param encodings {string[]} The encodings to accept.
         * @returns {string[] | string | false} The first accepted encoding or false if nothing is accepted.
         */
        encoding: accept.encoding.bind(accept),

        /** Return the encodings that the request accepts,
         * in the order of the client's preference (most preferred first).
         * Can be used as both property and method.
         *
         * @returns {string[]} The encodings that the request accepts, in the order of the client's preference (most preferred first).
         */
        encodings: accept.encodings.bind(accept),

        /** Return the first accepted language.
         * If nothing in languages is accepted, then false is returned.
         * When used as property acts the same as `languages`.
         *
         * @param languages {string[]} The languages to accept.
         * @returns {string[] | string | false} Return the first accepted language. If nothing in languages is accepted, then false is returned.
         */
        language: accept.language.bind(accept),

        /** Return the languages that the request accepts,
         * in the order of the client's preference (most preferred first).
         * Can be used as both property and method.
         *
         * @returns {string[]} Return the languages that the request accepts, in the order of the client's preference (most preferred first).
         */
        languages: accept.languages.bind(accept),

        /** Return the first accepted type.
         * If nothing in types is accepted, then false is returned.
         * When used as property acts the same as `types`.
         *
         * @param types {string[]} The types to accept.
         * @returns {string[]} The first accepted type.
         *  It is returned as the same text as what appears in the types array.
         *  If nothing in types is accepted, then false is returned.
         */
        type: accept.type.bind(accept),

        /** Return the types that the request accepts, in the order of the client's preference (most preferred first).
         * Can be used as both property and method.
         *
         * @returns {string[]} The types that the request accepts, in the order of the client's preference (most preferred first).
         */
        types: accept.types.bind(accept),
      };
    })
    .macro(({ onBeforeHandle }) => ({
      /** Check that the client accepts the specified types.
       * If not, return 406.
       *
       * @param types {string[]} The types to accept
       */
      types(types: string[]) {
        onBeforeHandle({ insert: "before" }, ({ type, error }) => {
          if (type && !type(types)) {
            return error(406, "Not Acceptable");
          }
        });
      },
    }));
}
