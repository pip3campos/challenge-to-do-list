import request from "supertest";
import app from '../../app';


describe('Authentication Routes', () => {
    describe('/signup (POST)', () => {
        it("should sign up a user successfully with valid data", async () => {
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test27@example.com',
                password: 'validPassword123'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('online', false);
        });
        it("should fail sign-up if email is already taken", async () => {
            await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test28@example.com',
                password: 'validPassword123'
            });
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test28@example.com',
                password: 'newPassword123'
            });
            expect(res.status).toBe(409);
            expect(res.body).toHaveProperty('message', 'A user with this email address already exists. Please log in instead.');
            expect(res.body).toHaveProperty('success', false);
        });
        it("should fail sign-up if email is invalid", async () => {
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'invalid-email',
                password: 'validPassword123'
            });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', ["Email must contain @xxxx.com"]);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('response', "validation error");
        });
        it("should fail sign-up if password is too weak", async () => {
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'newuser@example.com',
                password: 'short'
            });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', ["Password need min 8 characters"]);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('response', "validation error");
        });
        it("should fail sign-up if missing required fields", async () => {
            const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'newuser@example.com'
            });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', ["Password Required"]);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('response', "validation error");
        });
    });
    describe('/signin (PATCH)', () => {
        it("should sign in a user successfully with correct credentials", async () => {
            const res = await request(app)
            .patch('/api/auth/signin')
            .send({
                email: 'test@example.com',
                password: 'validPassword123'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'User sign in successfull');
            expect(res.body).toHaveProperty('success', true);
            expect(res.body).toHaveProperty('response');
            expect(res.body.response).toHaveProperty('token');
        });
        it("should fail sign-in with incorrect credentials", async () => {
            const res = await request(app)
            .patch('/api/auth/signin')
            .send({
                email: 'test@example.com',
                password: 'wrongPassword'
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('message', 'Invalid credentials');
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('response', null);
        });
        it("should fail sign-in with missing credentials", async () => {
            const res = await request(app)
            .patch('/api/auth/signin')
            .send({
                email: 'test@example.com'
            });
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', ["Password Required"]);
            expect(res.body).toHaveProperty('success', false);
            expect(res.body).toHaveProperty('response', "validation error");
        });
        it("should fail sign-in for non-existent user", async () => {
            const res = await request(app)
            .patch('/api/auth/signin')
            .send({
                email: 'nonexistent@example.com', password: 'password'
            });
            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('message', "User not found.");
            expect(res.body).toHaveProperty('success', false);
        });
    });
    describe('/signout (PATCH)', () => {
        let authToken: string;

        beforeAll(async () => {
            const res = await request(app)
            .patch('/api/auth/signin')
            .send({
                email: "test@example.com",
                password: "validPassword123"
            });
            authToken = res.body.response.token;
        });
        it("should sign out a user successfully with valid token", async () => {
            const res = await request(app)
            .patch('/api/auth/signout')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ email: "test@example.com" });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'User signed out successfully');
        });
        it("should fail sign-out if no token is provided", async () => {
            const res = await request(app)
            .patch('/api/auth/signout')
            .send({ email: "test@example.com" });
            expect(res.status).toBe(401);
            expect(res.error).toHaveProperty('text', 'Unauthorized');
        });
        it("should fail sign-out if invalid or expired token", async () => {
            const res = await request(app)
            .patch('/api/auth/signout')
            .set('Authorization', `Bearer invalidToken`)
            .send({ email: "test@example.com" });
            expect(res.status).toBe(401);
            expect(res.error).toHaveProperty('text', 'Unauthorized');
        });
    });
});