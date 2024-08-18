import type { RootState } from "../lib/store"; //'../../app/store'
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../lib/features/counter";
import { updateUser } from "@/lib/features/user";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  console.log(count);
  const dispatch = useDispatch();
  const t = {
    name: "",
    avatarURL: "null",
    id: "ac1f26b9-b8be-4d30-92aa-e38b67069ecb",
    username: "vivekrawani",
    email: "slim@shady.com",
  };
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <button aria-label="set user" onClick={() => dispatch(updateUser(t))}>
          Set user
        </button>
      </div>
    </div>
  );
}
