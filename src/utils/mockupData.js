const mockupScreams = [
	{
		body: "Hello, This is my first scream. How are you doing?",
		screamId: Date.now(),
		userHandle: 'chondan',
		createdAt: new Date('01/01/2021').toISOString(),
		userImage: `https://raw.githubusercontent.com/Chondan/Social-App/main/Assets/default-profile.png`,
		likeCount: 5,
		commentCount: 2
	}
];

const mockupUserData = {
	createdAt: "2021-01-05T09:59:08.884Z",
	email: "chondan@test.com",
	handle: "chondan_test",
	imageUrl: `https://raw.githubusercontent.com/Chondan/Social-App/main/Assets/default-profile.png`,
	userId: "5EVLFjqq6iOVGIV6BlfU9VY6SMI2"
}

export { mockupScreams, mockupUserData };