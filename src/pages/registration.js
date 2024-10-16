export default function Registration() {
  return (
    <div className="registration">
      <h2>Register Here</h2>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        minlength="5"
        maxlength="20"
        size="22"
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        minlength="5"
        maxlength="20"
        size="22"
      />
    </div>
  )
}
