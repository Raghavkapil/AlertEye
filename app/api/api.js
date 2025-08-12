export const sendPanicAlert = async (location, videoUri) => {
  console.log("Sending panic alert:", { location, videoUri });
  return { success: true };
};

export const sendFriendRequest = async (email) => {
  console.log("Sending friend request to:", email);
  return { success: true };
};

export const getFriendsLocations = async () => {
  return [
    { name: "John Doe", lat: 37.7749, lng: -122.4194 },
    { name: "Jane Smith", lat: 37.7849, lng: -122.4094 },
  ];
};
