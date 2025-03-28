type Left<L> = { type: "left"; value: L };
type Right<R> = { type: "right"; value: R };

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R>(value: L): Either<L, R> => ({ type: "left", value });
export const right = <L, R>(value: R): Either<L, R> => ({
  type: "right",
  value,
});

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> =>
  either.type === "left";
export const isRight = <L, R>(either: Either<L, R>): either is Right<R> =>
  either.type === "right";
