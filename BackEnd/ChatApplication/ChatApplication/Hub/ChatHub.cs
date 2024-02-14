using Microsoft.AspNetCore.SignalR;

namespace ChatApplication.Hub
{
    public class ChatHub: Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IDictionary<string, UserRoomConnection> _connection;
    public ChatHub(IDictionary<string, UserRoomConnection> connection)
    {
      _connection = connection;
    }
    //Joining the room
    public async Task JoinRoom(UserRoomConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName: userConnection.Room!);
            _connection[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.Room!) //clientProxy
              .SendAsync("ReceiveMessage", "Lets program Bot",$"{userConnection.User} has Joined the Group",DateTime.Now);//task
            await SendConnectedUser(userConnection.Room!);

        }
        //sending the messages
        public async Task SendMessage(string message)
        {
            if(_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userRoomConnection))
            {
                await Clients.Group(userRoomConnection.Room!) //clientProxy
                    .SendAsync( "ReceiveMessage", userRoomConnection.User, message, DateTime.Now);//Task
              }
        }
    //disconnect the user
        public override Task OnDisconnectedAsync(Exception? exp)
        {
            if (!_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection roomConnection))
            {
                return base.OnDisconnectedAsync(exp);
            }
            _connection.Remove(Context.ConnectionId);
            Clients.Group(roomConnection.Room!)
                .SendAsync("ReceiveMessage", "Chat App", $"{roomConnection.User} has Left the Group", DateTime.Now);
            SendConnectedUser(roomConnection.Room!);
            return base.OnDisconnectedAsync(exp);
        }
        //Connected users in group
        public Task SendConnectedUser(string room) 
        {
            var users = _connection.Values
                       .Where(u => u.Room == room)
                       .Select(s => s.User);
            return Clients.Group(room).SendAsync("ConnectedUser", users);
        }


    }
}
