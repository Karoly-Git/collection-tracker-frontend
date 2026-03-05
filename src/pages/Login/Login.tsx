import "./Login.scss";

export default function Login() {
    const handleSubmit = (e: SubmitEvent): void => {
        e.preventDefault();

        const form = new FormData(e.target as HTMLFormElement);
        const email = form.get("email");
        const password = form.get("password");

        console.log({ email, password });
    };

    return (
        <div className="login">
            <div className="login__card">
                <h1 className="login__title">Login</h1>

                <form
                    className="login__form"
                    onSubmit={(e) => handleSubmit(e.nativeEvent)}
                >
                    <div className="login__field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="login__field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button className="login__button" type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}