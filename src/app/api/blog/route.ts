const blog = [
  {
    id: 1,
    title: "First Blog Post",
    content: "This is my first blog",
  },
  {
    id: 2,
    title: "Second One",
    content: "This is a second blog",
  },
];

export function GET() {
  return Response.json(blog[0]);
}
