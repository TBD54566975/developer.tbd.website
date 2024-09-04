use web5_cli::*;  // Import everything from web5_cli
use anyhow::Result;

#[tokio::test]
async fn test_did_create_dht() -> Result<()> {
    println!("Starting test_did_create_dht");

    // Check if DidCommands is available under this namespace
    let did_command = DidCommands::Dht {
        no_publish: true,
        no_indent: false,
        json_escape: false,
    };

    // Execute the command
    did_command.command();

    println!("Test completed successfully");
    Ok(())
}
