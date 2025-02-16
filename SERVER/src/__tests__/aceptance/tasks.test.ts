import request from "supertest";
import app from '../../app';


describe('Task Routes', () => {
    let authToken: string;
    let author_id: string;

    beforeAll(async () => {
        const signInResponse = await request(app)
          .patch('/api/auth/signin')
          .send({ email: 'test@example.com', password: 'validPassword123' });
        authToken = signInResponse.body.response.token;
        author_id = signInResponse.body.response.findUser._id;
      });

    describe('/tasks (GET)', () => {
        it('should retrieve tasks successfully for authenticated user', async () => {
            const res = await request(app)
            .get(`/api/tasks/${author_id}`)
            .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should fail to retrieve tasks without authentication', async () => {
            const res = await request(app)
            .get(`/api/tasks/${author_id}`)
            expect(res.status).toBe(401)
            expect(res.error).toHaveProperty('text', 'Unauthorized');
        });
    });

    describe('/tasks (POST)', () => {
        it('should create a task successfully', async () => {
            const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: "Test Task",
                author_id
            })
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('title', 'Test Task');
        });

        it('should fail to create a task without authentication', async () => {
            const res = await request(app)
            .post('/api/tasks')
            .send({
                title: "Test Task",
                author_id
            })
            expect(res.status).toBe(401)
            expect(res.error).toHaveProperty('text', 'Unauthorized');
        });

        it('should fail to create a task with missing required fields', async () => {
            const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: "Test Task"
            });
            expect(res.status).toBe(400)
        });

        /* it('should fail to create a task with invalid data types', async () => {
            const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: 123,
                author_id
            });
            expect(res.status).toBe(400)
        }); */
    });

    describe('/tasks/:id (PATCH)', () => {
        let taskId: string;

        beforeAll(async () => {
            const createResponse = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: "Task to edit",
                author_id
            });
            taskId = createResponse.body._id;
        });

        it('should edit a task successfully', async () => {
            const res = await request(app)
            .patch(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ title: 'Updated Task' });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'Updated Task');
        });

        it('should fail to edit a non-existent task', async () => {
            const res = await request(app)
            .patch(`/api/tasks/invalidId`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ title: 'Non-existent Task' });
            expect(res.status).toBe(400);
        });

        it('should fail to edit a task without authentication', async () => {
            const res = await request(app)
            .patch(`/api/tasks/${taskId}`)
            .send({ title: 'Unauthorized Edit' });
            expect(res.status).toBe(401);
            expect(res.error).toHaveProperty('text', 'Unauthorized');
        });
    });

    describe('/tasks/:id (DELETE)', () => {
        let taskId: string;

        beforeAll(async () => {
            const createResponse = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                title: "Task to delete",
                author_id
            });
            taskId = createResponse.body._id;
        });

        it('should delete a task successfully', async () => {
            const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).toBe(204);
        });

        it('should fail to delete a non-existent task', async () => {
            const res = await request(app)
            .delete(`/api/tasks/invalidId`)
            .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).toBe(400);
        });

        it('should fail to delete a non-existent task', async () => {
            const res = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).toBe(404);
        });

        it('should fail to delete a task without authentication', async () => {
            const res = await request(app)
            .delete(`/api/tasks/${taskId}`);
            expect(res.status).toBe(401);
            expect(res.error).toHaveProperty('text', 'Unauthorized');
        });
    })
});