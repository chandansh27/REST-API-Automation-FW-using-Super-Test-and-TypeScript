import * as supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {

    describe('GET Requests', () => {
        it('GET /posts', async () => {
            const res = await request.get('/posts');
            //console.log(res);
            expect(res.statusCode).toBe(200);
            expect(res.body[0].id).toBe(1);
        });

        it('GET /comments with query params', async () => {
            const res = await request.get('/comments').query({ postId: 1, limit: 10 });
            console.log(res);
            expect(res.body[0].postId).toBe(1);
        });
    });

    describe('POST Request', () => {
        it('POST /posts', async () => {
            const data = {
                "title": "My Fav animes",
                "body": "Naruto, One Piece, Hunter X Hunter",
                "userId": 1,
            };
            const res = await request.post('/posts').send(data);
            expect(res.statusCode).toBe(201);
            expect(res.body.title).toBe(data.body);
        });
    });

    describe('PUT Request', () => {
        it('PUT /posts/{id}', async () => {
            const data = {
                "title": "Update Title",
                "body": "Some Update content ...",
                "userId": 5
            };
            const getRes = await request.get('/posts/1')
            const beforeTitle= getRes.body.title;
            console.log(beforeTitle);

            const res = await request.put('/posts/1').send(data);

            expect(res.statusCode).toBe(200);
            expect(res.body.title).not.toBe(beforeTitle);
            expect(res.body.title).toBe(data.title);
        });

    })

    describe('PATCH Request', () => {
        it('PATCH /posts/{id}', async () => {
            const data = {
                "title": "MY Update Title"
            };
            const getRes = await request.get('/posts/1')
            const beforeTitle= getRes.body.title;
            
            const res = await request.patch('/posts/1').send(data);

            expect(res.statusCode).toBe(200);
            expect(res.body.title).not.toBe(beforeTitle);
            expect(res.body.title).toBe(data.title);
        });

    })

    describe('DELETE Requests', () => {
        it('DELETE /posts/{id}', async () => {
            const res = await request.delete('/posts/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({})
            
       });

 });

})


